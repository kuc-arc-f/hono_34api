import type { Database } from '@cloudflare/d1'
import moment from 'moment';
//
interface Env {
    DB: Database
}
const retObj = {ret: "NG", data: [], message: "Error, Internal Server Error"};
//
const Router = {
    /**
     * route
     * @param
     *
     * @return
     */ 
    get_list: async function(c, DB)
    {
        try{    
            const result = await DB.prepare(`SELECT * FROM BmCategory ORDER BY id DESC`).all();
    console.log(result.results);
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
    /**
     * 
     * @param
     *
     * @return
    */    
    create: async function(body, DB)
    {
        try{    
console.log(body);
            if (body) {
                const dt =  moment().format("YYYY-MM-DD 00:00:00");
console.log(dt);
//console.log(dayjs());
console.log(moment().format("YYYY-MM-DD 00:00:00"));
                const sql = `
                INSERT INTO BmCategory (name, userId, updatedAt) 
                VALUES('${body.name}', 0, '${dt}')
                `;
console.log(sql);
                //console.log(sql);
                await DB.prepare(sql).run();
            }
            return {ret: "OK", data: body};
        } catch (e) {
            console.error(e);
            return [];
        } 
    },
    /**
     *
     * @param
     *
     * @return
     */    
    get: async function(c, DB, id)
    {
        //console.log("#get");
        try{    
            return {};
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
    delete: async function(body, DB)
    {
        try{    
//console.log(body);
            if (body) {
                await DB.prepare(sql).run();
            }
            return {ret: "OK", data: body};
        } catch (e) {
            console.error(e);
            return {ret: "NG", data: body};
        } 
    },    
    /**
     * 
     * @param
     *
     * @return
     */    
    update: async function(body, DB)
    {
        try{    
console.log(body);
            if (body) {
                /*
                const sql = `
                UPDATE Project 
                SET name = '${body.name}', InveiteCode = '${body.InveiteCode}'
                WHERE id = ${body.id}
                `;
console.log(sql);
                await DB.prepare(sql).run();
                */
            }
            return {ret: "OK", data: body};
        } catch (e) {
            console.error(e);
            return [];
        } 
    },
}
export default Router;