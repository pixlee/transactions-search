import request from './lib/request'

export const DEFAULT_SORT = "orderId,asc"

/**
 * Get a paginated list of transactions, returning a promise
 *
 * @param  {number} pageNumber    The page number of transactions to get
 * @param  {number} pageSize      The number of transactions to get
 * @param  {string} sort          Properties to sort in the format sort=property,(asc|desc)
 * @param  {object} filterOptions Object containing options to search on for example:
 *    { siteId: 1, orderId: 'T12345', orderDate: ' }
 *
 * @return {Page} The response data
 */
export const list = getApiPath('/api/searchTools/transaction');
export const count = getApiPath('/api/searchTools/transactionCounts');


  function getApiPath(path) {
    return async ({ pageNumber = 0, pageSize = 20, sort = DEFAULT_SORT, filterOptions, siteKey }) => {
    let payload = `{"siteKey":"${siteKey}",`

      if(filterOptions) {

          for (var key in filterOptions) {
              var value = filterOptions[key];
              if(value) {
                  payload = payload.concat(`"${key}":"${value}",`)
              }
              console.log(key, value);
          }
          payload = payload.concat(`"pageNumber":"${pageNumber}"}`)

          console.debug(`payload 4 is ${payload}` );
      } else {
          payload = payload.concat(`"pageNumber":"${pageNumber}"}`)
      }


      if (payload){
          console.debug(`sending this payload to exporter: ${payload}`)
          const response = await request(`${path}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: payload
          });

          console.debug(`got back this response from exporter: ${response}`)

          return response
      }
  }
  }
