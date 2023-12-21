//import Common from '../lib/Common';
//
const router = {

  /**
  * create
  * @param
  *
  * @return
  */
  create: async function (body, DB)
  {
    const retObj = {ret: "NG", data: [], message: ''}
//    return res.json({ret: "OK", data: req})
    try{
      console.log(body);
      if (body) {
          const sql = `
          INSERT INTO todos ( title, content)
          VALUES('${body.title}', '${body.content}');
          `;
          //console.log(sql);
          await DB.prepare(sql).run();
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
  update: async function (body, DB)
  {
  //    console.log("#test.update");
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (body) {
        const sql = `
        UPDATE todos 
        SET title = '${body.title}', content='${body.content}'
        WHERE id = ${body.id}
        `;
console.log(sql);
        await DB.prepare(sql).run();
      }                
      return {ret: "OK", data: body};
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
  delete: async function (body: any, DB: any)
  {
//    console.log("#test.delete");
//    console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (body) {
        const sql = `
        DELETE FROM todos WHERE id = ${body.id}
        `;
        //console.log(sql);
        await DB.prepare(sql).run();
      }            
      return {ret: "OK", data: body};
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
  get: async function (body, c, DB)
  {
    let item = {};
    try{
      const sql = `SELECT * FROM todos WHERE id =  ${body.id}`;            
      const result = await DB.prepare(sql).all();
console.log(result.results);
      if(result.results.length < 1) {
          console.error("Error, results.length < 1");
          return {};
      }
      return result.results[0];
    } catch (e) {
      console.error(e);
      return {};
    } 
  }, 
  /**
  *
  * @param
  *
  * @return
  */ 
  get_list: async function (c, DB)
  {
//    console.log(req);
    let item = {};
//    let result: any = {}; 
    const retObj = {ret: "NG", data: [], message: ''}
//    return Response.json(retObj);
    try{
      const result = await DB.prepare(`SELECT * FROM todos ORDER BY id DESC`).all();
      //console.log(result.results);
      if(result.results.length < 1) {
          console.error("Error, results.length < 1");
          return [];
      }
      return result.results;    
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  },   
}
export default router;
