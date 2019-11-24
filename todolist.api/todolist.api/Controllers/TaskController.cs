using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace todolist.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {

        private readonly ILogger<TaskController> _logger;

        public TaskController(ILogger<TaskController> logger)
        {
            this._logger = logger;
        }

        public static List<TodoTask> tasks = new List<TodoTask>();
        // GET: api/Task
        [HttpGet]
        public List<TodoTask> Get()
        {
            return tasks;
        }

        // GET: api/Task/5
        [HttpGet("{id}", Name = "Get")]
        public TodoTask Get(Guid id)
        {
            return tasks.Where(t => t.Id == id).First();
        }

        // POST: api/Task
        [HttpPost]
        public IActionResult Post([FromBody] TodoTask newTask)
        {
            tasks.Add(newTask);
            _logger.LogInformation("Adding task {task}", JsonConvert.SerializeObject(newTask));
            return CreatedAtAction("Get", new { id = newTask.Id });
        }


        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            tasks.RemoveAll(t => t.Id == id);
            return NoContent();
        }
    }
}
