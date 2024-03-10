//
const router = {
  /**
  * create
  * @param
  *
  * @return
  */
  create: async function (body, DB): Promise<Response>
  {
console.log(body);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (body) {
        const sql = `
        INSERT INTO todos ( title, content, completed, userId)
        VALUES('${body.title}', '${body.content}', 0,  ${body.userId});
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
  delete: async function (body, DB): Promise<Response>
  {
console.log(body);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (body) {
        const sql = `
        DELETE FROM todos WHERE id = ${body.id}
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
//      return Response.json({ret: "OK", data: req});
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
  update: async function (req: any, res: any, env: any): Promise<Response>
  {
  //    console.log("#test.update");
console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        UPDATE todos 
        SET title = '${req.title}', content='${req.content}',
        completed = '${req.completed}'
        WHERE id = ${req.id}
        `;
        console.log(sql);
        const resulte = await env.DB.prepare(sql).run();
        if(resulte.success !== true) {
          console.error("Error, update");
          throw new Error('Error , update');
        }           
      }                
      return Response.json({ret: "OK", data: req});
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
  get: async function (body, DB): Promise<Response>
  {
//    console.log(req);
    let item = {};
    let result: any = {}; 
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (body) {
        const sql = `
        SELECT * FROM todos
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
//      return Response.json({ret: "OK", data: item});
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
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      let result: any = {};  
      if (body) {
        const sql = `
        SELECT * FROM todos
        WHERE userId = ${body.userId}
        ORDER BY id DESC
        `;  
console.log(sql);
        resulte = await DB.prepare(sql).all();
console.log(resulte.results);
        if(resulte.length < 1) {
          console.error("Error, results.length < 1");
          throw new Error('Error , get');
        }              
      }
      return {ret: "OK", data: resulte.results};           
//      return Response.json({ret: "OK", data: resulte.results});
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
  search: async function (req: any, res: any, env: any): Promise<Response>
  {
console.log(req);
    let resulte: any = [];
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      let result: any = {};  
      if (req) {
        const sql = `
        SELECT * FROM todos
        WHERE userId = ${req.userId}
        AND title like '%${req.seachKey}%'
        ORDER BY id DESC
        LIMIT 1000
        `;  
//console.log(sql);
        resulte = await env.DB.prepare(sql).all();
        //console.log(resulte);
        if(resulte.length < 1) {
          console.error("Error, results.length < 1");
          throw new Error('Error , get');
        }              
      }           
      return Response.json({ret: "OK", data: resulte.results});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  },  
}
export default router;
