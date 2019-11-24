using System;

namespace todolist.api.Controllers
{
    public class TodoTask
    {
        public string Name { get; set; }
        public Guid Id { get; set; }
    }
}