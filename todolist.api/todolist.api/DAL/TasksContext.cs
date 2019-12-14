using Microsoft.EntityFrameworkCore;
using todolist.api.Model;

public class TaskContext : DbContext
{

    public TaskContext(DbContextOptions options)
        : base(options)
    {
    }

    public DbSet<TodoTask> Tasks { get; set; }
}