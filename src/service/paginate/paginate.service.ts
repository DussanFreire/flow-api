import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginateService {

    public async paginatedResults(model, _page, _limit) {
        
          const page = _page
          const limit = _limit

          const startIndex = (parseInt(page) - 1) * limit;
          const endIndex = parseInt(page) * limit;
        
        
          const results = {};
      
          if (endIndex < await Object. keys(model). length) {
            results['next'] = {
              page: parseInt(page) + 1,
              limit: limit
            }
          }
          
          if (startIndex > 0) {
            results['previous'] = {
              page: page - 1,
              limit: limit
            }
          }
          try {
            results['results'] = await model.slice(startIndex, endIndex);
          } catch (e) {
            return e
          }
          
        return results;
    }
}
