namespace Agilator.Repositories
{
    using Agilator.Data;
    using Agilator.Repositories.Interfaces;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    public class Repository : IRepository
    {
        protected ApplicationDbContext dbContext;

        public Repository(ApplicationDbContext context)
        {
            dbContext = context;
            
        }
        public async Task CreateAsync<T>(T entity) where T : class
        {
                await this.dbContext.Set<T>().AddAsync(entity);

            _ = await this.dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync<T>(T entity) where T : class
        {
            this.dbContext.Set<T>().Remove(entity);

            _ = await this.dbContext.SaveChangesAsync();

        }

        public async Task<List<T>> SelectAll<T>() where T : class
        {
            return await this.dbContext.Set<T>().ToListAsync();
        }

        public async Task<T> SelectById<T>(string id) where T : class
        {
            return await this.dbContext.Set<T>().FindAsync(id);
        }

        public async Task UpdateAsync<T>(T entity) where T : class
        {
            this.dbContext.Set<T>().Update(entity);

            _ = await this.dbContext.SaveChangesAsync();
        }
    }
}
