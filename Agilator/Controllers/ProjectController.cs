namespace Agilator.Controllers
{
    using Agilator.DataTransfer;
    using Agilator.DataTransfer.Project;
    using Agilator.Models;
    using Agilator.Repositories.Interfaces;
    using AutoMapper;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    [Authorize]
    [Route("api/project")]
    [ApiController]

    public class ProjectController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IRepository _repository;
        private readonly IMapper _mapper;
        public ProjectController(UserManager<ApplicationUser> userManager, IRepository repository, IMapper mapper)
        {
            _userManager = userManager;
            _repository = repository;
            _mapper = mapper;
        }
        
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Project>>> All()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var result = await _repository.SelectAll<Project>();
            result = result.Where(r => r.OwnerId == user.Id).ToList();

            return result;
        }

        [HttpPost("create")]
        public async Task<ActionResult<Project>> Create([FromBody]CreateProjectDto model)
        {
            if (model == null || !ModelState.IsValid)
                return BadRequest();

            var project = _mapper.Map<Project>(model);

            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            project.OwnerId = user.Id;

            try
            {
                await _repository.CreateAsync(project);
            }catch(Exception e)
            {
                var errorMessages = new HashSet<string> { e.ToString() };
                return BadRequest(new ResponseDto { Errors = errorMessages });
            }

            return Ok(new ResponseDto { IsSuccessful = true });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(string id)
        {
            var model = await _repository.SelectById<Project>(id);

            if (model == null)
            {
                return NotFound();
            }

            return model;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProject(string id, [FromBody] EditProjectDto model)
        {
            if (model == null || !ModelState.IsValid || id != model.Id) return BadRequest();
            
            var project = await _repository.SelectById<Project>(model.Id);

            if (project == null) return NotFound();

            project.Name = model.Name;
            project.Description = model.Description;

            try
            {
                await _repository.UpdateAsync(project);
            }
            catch (Exception e)
            {
                var errorMessages = new HashSet<string> { e.ToString() };
                return BadRequest(new ResponseDto { Errors = errorMessages });
            }

            return Ok(new ResponseDto { IsSuccessful = true });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Project>> DeleteProject(string id)
        {
            var model = await _repository.SelectById<Project>(id);

            if (model == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync(model);

            return model;
        }
    }
}
