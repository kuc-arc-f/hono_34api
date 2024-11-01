
const MAX_LIMIT = 10000;
//
const router = {
  /**
  *
  * @param
  *
  * @return
  */
  create: async function (body, DB): Promise<Response>
  {
console.log(body);
    const retObj = {ret: 500, message: ''};
    try{
      if (body) {
        const query = `
        INSERT INTO ai_table1 (dt_type, content)
        VALUES (?, ?);
      `;
      //console.log(sql);

        const values = [body.dt_type, body.content];
        const result = await DB.prepare(query).bind(...values).run();
        if (result.success) {
          retObj.ret = 200;
          return retObj;
        } else {
          return retObj;
        }
      }            
      return retObj;
    } catch (e) {
      console.error(e);
      return retObj;
    } 
  }, 
  /**
  *
  * @param
  *
  * @return
  */ 
  delete: async function (body, DB): Promise<Response>
  {
console.log(body);
    const retObj = {ret: 500, message: ''};
    try{
      if (!body) {
        console.log('ID is required.')
        return retObj;
      }
      const query = `
      DELETE FROM ai_table1
      WHERE id = ?;
      `;
      const result = await DB.prepare(query).bind(body.id).run();
      if (result.success) {
        retObj.ret = 200;
        return retObj;
      } else {
        return retObj;
      }
    } catch (e) {
      console.error(e);
      return retObj;
    } 
  },
  /**
  *
  * @param
  *
  * @return
  */ 
  update: async function (body, DB): Promise<any>
  {
    const retObj = {ret: 500, message: ''};
console.log(body);
    try{
      if (!body) {
        console.log('ID is required.')
        return retObj;
      }
      const sql = `
      UPDATE ai_table1 
      SET content='${body.content}'
      WHERE id = ${body.id}
      `;
      console.log(sql);
      const result = await DB.prepare(sql).run();
      if(result.success !== true) {
        console.error("Error, update");
        throw new Error('Error , update');
      }           
      retObj.ret = 200;
      return retObj;
    } catch (e) {
      console.error(e);
      return retObj;
    } 
  },
  /**
  *
  * @param
  *
  * @return
  */
  get: async function (body, DB): Promise<Response>
  {
    const retObj = {ret: 500, message: ''};
    let item = {};
    let result: any = {}; 
    try{
      if (body) {
        const sql = `
        SELECT * FROM ai_table1
        WHERE id = ${body.id}
        `;        
        result = await DB.prepare(sql).all();
//console.log(result.results);
        if(result.results.length < 1) {
          console.error("Error, results.length < 1");
          throw new Error('Error , get');
        }
        item = result.results[0];
      }      
      return {ret: "OK", data: item};
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  }, 
  /**
  *
  * @param
  *
  * @return
  */ 
  get_list: async function (body, DB): Promise<Response>
  {
//console.log(req);
    let resulte: any = [];
    const retObj = {ret: 500, message: ''};
    try{
      let result: any = {};  
      if (body) {
        const query = `
          SELECT id, dt_type, content, 
          userId, createdAt, updatedAt
          FROM ai_table1
          WHERE dt_type =${body.dt_type} 
          ORDER BY id DESC
          LIMIT ${MAX_LIMIT}
          ;
        `;
        console.log(query);
        const result = await DB.prepare(query).all();
        if (result.results) {
          retObj.ret = 200;
          retObj.data = result.results;
          //console.log(retObj.data);
          return retObj;
        } else {
          return retObj;
        }
      }
    } catch (e) {
      console.error(e);
      return retObj;
    } 
  },   
  /**
  *
  * @param
  *
  * @return
  */ 
  search: async function (req: any, res: any, env: any): Promise<Response>
  {
    try{
console.log(req);
      return Response.json({ret: "OK", data: [] });
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  },  
}
export default router;
