//
const router = {
  /**
  * create
  * @param
  *
  * @return
  */
  create: async function (body: any, DB: any): Promise<Response>
  {
console.log(body);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (body) {
        const deleteSql = `
        DELETE FROM Plan
        WHERE date(p_date) = date(datetime('${body.p_date}'))
        AND userId = ${body.userId}
        `;
        console.log(deleteSql);
        const resulteDelete = await DB.prepare(deleteSql).run();
        //console.log(resulte);
        if(resulteDelete.success !== true) {
          console.error("Error, delete");
          throw new Error('Error , delete');
        } 
        //
        const sql = `
        INSERT INTO Plan
        (userId, content, p_date)
        VALUES(
        ${body.userId}, '${body.content}',
        datetime('${body.p_date}', 'localtime')
        )
        `;
//console.log(sql);
        const resulte = await DB.prepare(sql).run();
//console.log(resulte);
        if(resulte.success !== true) {
          console.error("Error, /create");
          throw new Error('Error , create');
        }
        //id
        const sql_id = "SELECT last_insert_rowid() AS id;";
        const resultId = await DB.prepare(sql_id).all();
//console.log(resultId);
        if(resultId.results.length < 1) {
          console.error("Error, resultId.length < 1");
          throw new Error('Error , create, SELECT last_insert_rowid');
        }
        const item_id = resultId.results[0].id;
console.log("item_id=", item_id);
        body.id = item_id;
      }            
      return {ret: "OK", data: body};
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
  delete: async function (body: any, DB: any): Promise<Response>
  {
console.log(body);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (body) {
        const sql = `
        DELETE FROM Plan WHERE id = ${body.id}
        `;
console.log(sql);
        const resulte = await DB.prepare(sql).run();
//console.log(resulte);
        if(resulte.success !== true) {
          console.error("Error, delete");
          throw new Error('Error , delete');
        }      
      }
      return {ret: "OK", data: body};
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
  update: async function (body: any, DB: any): Promise<any>
  {
  //    console.log("#test.update");
console.log(body);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (body) {
        const sql = `
        UPDATE Plan set content = '${body.content}'
        WHERE id = ${body.id};        
        `;
        console.log(sql);
        const resulte = await DB.prepare(sql).run();
        if(resulte.success !== true) {
          console.error("Error, update");
          throw new Error('Error , update');
        }           
      }                
      return {ret: "OK", data: body};
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
  get: async function (req: any, res: any, env: any): Promise<Response>
  {
//    console.log(req);
    let item = {};
    let result: any = {};
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        SELECT * FROM Plan
        WHERE id = ${req.id}
        `;        
        result = await env.DB.prepare(sql).all();
//console.log(result.results);
        if(result.results.length < 1) {
          console.error("Error, results.length < 1");
          throw new Error('Error , get');
        }
        item = result.results[0];
      }      
      return Response.json({ret: "OK", data: item});
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
  get_list: async function (body, DB): Promise<any>
  {
//    console.log(req);
    let resulte: any = [];
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (body) {
        const sql = `
        SELECT id, userId, p_date, content FROM Plan
        WHERE 
        (
          p_date >= datetime('${body.start}', 'localtime')
          AND p_date <= datetime('${body.end}', 'localtime')
        )
        AND userId = ${body.userId}
        ORDER BY p_date ASC
        `;  
console.log(sql);
        resulte = await DB.prepare(sql).all();
console.log(resulte);
        if(resulte.results.length < 1) {
          console.error("Error, results.length < 1");
          throw new Error('Error , get');
        }              
      }           
      return resulte.results;
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  },   
}
export default router;
