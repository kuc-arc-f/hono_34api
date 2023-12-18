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
          VALUES('${body.title}', '${body.body}');
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
  update: async function (req: any, res: any, env: any): Promise<Response>
  {
  //    console.log("#test.update");
  //    console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        UPDATE Customers 
        SET CompanyName = '${req.title}', ContactName='${req.body}'
        WHERE id = ${req.id}
        `;
        console.log(sql);
        await env.DB.prepare(sql).run();
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
  delete: async function (req: any, res: any, env: any): Promise<Response>
  {
//    console.log("#test.delete");
//    console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        DELETE FROM Customers WHERE id = ${req.id}
        `;
        //console.log(sql);
        await env.DB.prepare(sql).run();
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
