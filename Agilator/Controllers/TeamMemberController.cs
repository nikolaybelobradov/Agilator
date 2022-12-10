using Agilator.DataTransfer;
using Agilator.DataTransfer.TeamMember;
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
    [Route("api/teamMember")]
    [ApiController]
    public class TeamMemberController : Controller
    {
        private readonly IRepository _repository;
        private readonly IMapper _mapper;
        public TeamMemberController(IRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<TeamMember>>> All(string id)
        {
            var teamMembers = await _repository.SelectAll<TeamMember>();
            teamMembers = teamMembers.Where(r => r.ProjectId == id).ToList();

            return teamMembers;
        }

        [HttpPost("add")]
        public async Task<ActionResult<TeamMember>> Add([FromBody] TeamMemberDto model)
        {
            if (model == null || !ModelState.IsValid) return BadRequest();

            var teamMember = _mapper.Map<TeamMember>(model);

            try
            {
                await _repository.CreateAsync(teamMember);
            }
            catch (Exception e)
            {
                var errorMessages = new HashSet<string> { e.ToString() };
                return BadRequest(new ResponseDto { Errors = errorMessages });
            }

            return Ok(new ResponseDto { IsSuccessful = true });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TeamMember>> DeleteTeamMember(string id)
        {
            var model = await _repository.SelectById<TeamMember>(id);

            if (model == null) return NotFound();

            await _repository.DeleteAsync(model);

            return model;
        }
    }
}
