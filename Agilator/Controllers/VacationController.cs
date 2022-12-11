namespace Agilator.Controllers
{
    using Agilator.DataTransfer;
    using Agilator.DataTransfer.Vacation;
    using Agilator.Models;
    using Agilator.Repositories.Interfaces;
    using AutoMapper;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    [Authorize]
    [Route("api/vacation")]
    [ApiController]
    public class VacationController : Controller
    {
        private readonly IRepository _repository;
        private readonly IMapper _mapper;
        public VacationController(IRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Vacation>>> All(string id)
        {
            var vacations = await _repository.SelectAll<Vacation>();
            vacations = vacations.Where(v => v.SprintId == id).ToList();

            return vacations;
        }

        [HttpPost()]
        public async Task<ActionResult<Vacation>> Update([FromBody] VacationDto model)
        {
            if (model == null || !ModelState.IsValid) return BadRequest();

            var vacations = await _repository.SelectAll<Vacation>();
            var vacation = vacations.Where(v => v.SprintId == model.SprintId && v.TeamMemberId == model.TeamMemberId).FirstOrDefault();

            var newVacation = _mapper.Map<Vacation>(model);

            if (vacation != null)
            {
                vacation.Duration = model.Duration;
            }

            try
            {
                if(vacation != null)
                {
                    if(vacation.Duration == 0)
                    {
                        await _repository.DeleteAsync(vacation);
                    }
                    else
                    {
                        await _repository.UpdateAsync(vacation);
                    }
                }
                else
                {
                    if(newVacation.Duration != 0)
                    {
                        await _repository.CreateAsync(newVacation);
                    }
                    else
                    {
                        return BadRequest();
                    }
                }

            }
            catch (Exception e)
            {
                var errorMessages = new HashSet<string> { e.ToString() };
                return BadRequest(new ResponseDto { Errors = errorMessages });
            }

            return Ok(new ResponseDto { IsSuccessful = true });
        }
    }
}
