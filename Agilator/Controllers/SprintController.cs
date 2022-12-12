using Agilator.DataTransfer;
using Agilator.DataTransfer.Sprint;
using Agilator.Models;
using Agilator.Repositories.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agilator.Controllers
{
    [Authorize]
    [Route("api/sprint")]
    [ApiController]
    public class SprintController : Controller
    {
        private readonly IRepository _repository;
        private readonly IMapper _mapper;
        public SprintController(IRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Sprint>>> All(string id)
        {
            var sprints = await _repository.SelectAll<Sprint>();
            sprints = sprints.Where(s => s.ProjectId == id).OrderByDescending(s => s.CreatedOn).ToList();

            return sprints;
        }

        [HttpGet("getSprint/{id}")]
        public async Task<ActionResult<Sprint>> GetSprint(string id)
        {
            var model = await _repository.SelectById<Sprint>(id);

            if (model == null) return NotFound();

            return model;
        }

        [HttpPost("add")]
        public async Task<ActionResult<Sprint>> Add([FromBody] CreateSprintDto model)
        {
            if (model == null || !ModelState.IsValid) return BadRequest();

            var sprint = _mapper.Map<Sprint>(model);

            try
            {
                await _repository.CreateAsync(sprint);
            }
            catch (Exception e)
            {
                var errorMessages = new HashSet<string> { e.ToString() };
                return BadRequest(new ResponseDto { Errors = errorMessages });
            }

            return Ok(new ResponseDto { IsSuccessful = true });
        }

        [HttpPut()]
        public async Task<IActionResult> EditSprint([FromBody] EditSprintDto model)
        {

            if (model == null || !ModelState.IsValid || model.Id == null) return BadRequest();

            var sprint = await _repository.SelectById<Sprint>(model.Id);

            if (sprint == null) return NotFound();

            sprint.Name = model.Name;
            sprint.Duration = model.Duration;

            try
            {
                await _repository.UpdateAsync(sprint);
            }
            catch (Exception e)
            {
                var errorMessages = new HashSet<string> { e.ToString() };
                return BadRequest(new ResponseDto { Errors = errorMessages });
            }

            return Ok(new ResponseDto { IsSuccessful = true });
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Sprint>> DeleteSprint(string id)
        {
            var model = await _repository.SelectById<Sprint>(id);

            if (model == null) return NotFound();

            await _repository.DeleteAsync(model);

            return model;
        }
    }
}
