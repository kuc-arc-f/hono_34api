import type { Database } from '@cloudflare/d1'
import moment from 'moment';
import LibPagenate from '../lib/LibPagenate';
const perPage: number = 10;
//
interface Env {
    DB: Database
}
const retObj = {ret: "NG", data: [], message: "Error, Internal Server Error"};
//
const Router = {
    //search_BookMarks
    /**
     *
     * @param
     *
     * @return
     */
    get_list_page: async function(c, DB, page)
    {
console.log("#get_list");
        try{    
            const pinfo = LibPagenate.getPageStart(page, perPage);
//console.log(pinfo);
            const sql = `
            SELECT * FROM BookMark ORDER BY id DESC
            LIMIT ${pinfo.end}
            OFFSET ${pinfo.start};
            `;
console.log(sql);
            const result = await DB.prepare(sql).all();
//console.log(result.results);
            if(result.results.length < 1) {
                console.error("Error, results.length < 1");
                return [];
            }
            return result.results;
        } catch (e) {
            console.error(e);
            return [];
        } 
    },
    /**
     * route
     * @param
     *
     * @return
     */ 
    get_list: async function(c, DB)
    {
        try{    
            const result = await DB.prepare(`SELECT * FROM BookMark ORDER BY id DESC`).all();
//    console.log(result.results);
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
    search: async function(body, DB)
    {
//console.log("#search");
        try{    
            if (body) {
                const sql = `
                SELECT * FROM BookMark
                WHERE title like '%${body.seachKey}%'
                ORDER BY id DESC
                LIMIT 100
                `;  
console.log(sql);
                const result = await DB.prepare(sql).all();
                //console.log(result.results);
                if(result.results.length < 1) {
                    console.error("Error, results.length < 1");
                    return [];
                }
                return result.results;
            }
            return [];
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
    create: async function(body, DB)
    {
        try{    
console.log(body);
            if (body) {
                const dt =  moment().format("YYYY-MM-DD 00:00:00");
//console.log(dt);
//console.log(moment().format("YYYY-MM-DD 00:00:00"));
                const sql = `
                INSERT INTO BookMark (title, url, bmCategoryId, updatedAt, userId) 
                VALUES(
                '${body.title}', '${body.url}', ${body.bmCategoryId},
                 '${dt}', 0)
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
            const sql = `
            SELECT * FROM BookMark where id = ${id}
            `;
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
    delete: async function(body, DB)
    {
        try{    
            const sql = `
            DELETE FROM BookMark  WHERE id= ${body.id};
            `;
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
console.log(sql);
                */
                const sql = `
                UPDATE BookMark set title = '${body.title}',
                url = '${body.url}',
                bmCategoryId = ${body.bmCategoryId}
                where id= ${body.id}
                `;
                await DB.prepare(sql).run();
            }
            return {ret: "OK", data: body};
        } catch (e) {
            console.error(e);
            return [];
        } 
    },
}
export default Router;