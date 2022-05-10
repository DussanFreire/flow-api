import { Injectable } from '@nestjs/common';
import { PaginationConfig } from 'src/enum/filter.serch.enum';

@Injectable()
export class PaginateService {

    public async paginatedResults(model, _page) {
        
          const page = _page
          const limit = PaginationConfig.LIMIT;

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
