using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using todolist.api.Model;

namespace todolist.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {

        private readonly ILogger<TaskController> _logger;
        private readonly TaskContext _db;

        public TaskController(ILogger<TaskController> logger, TaskContext db)
        {
            this._logger = logger;
            this._db = db;
        }

        // GET: api/Task
        [HttpGet]
        public List<TodoTask> Get()
        {
            return _db.Tasks.ToList();
        }

        // GET: api/Task/5
        [HttpGet("{id}", Name = "Get")]
        public TodoTask Get(Guid id)
        {
            return _db.Tasks.Where(t => t.Id == id).First();
        }

        // POST: api/Task
        [HttpPost]
        public IActionResult Post([FromBody] TodoTask newTask)
        {
            _db.Tasks.Add(newTask);
            _db.SaveChanges();
            _logger.LogInformation("Adding task {task}", JsonConvert.SerializeObject(newTask));
            return CreatedAtAction("Get", new { id = newTask.Id });
        }


        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            _db.Tasks.RemoveRange(_db.Tasks.Where(t => t.Id == id));
            _db.SaveChanges();
            return NoContent();
        }
    }
}
