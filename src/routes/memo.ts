import type { Database } from '@cloudflare/d1'
import moment from 'moment';
import LibPagenate from '../lib/LibPagenate';
const perPage: number = 10;
//
interface Env {
    DB: Database
}
const retObj = {ret: "NG", data: [], message: "Error, Internal Server Error"};

const Router = {
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
            SELECT * FROM Memo ORDER BY id DESC
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
                SELECT * FROM Memo
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
    get_list: async function(c, DB)
    {
//console.log("#get_list");
        try{    
            const sql = `SELECT * FROM Memo
             ORDER BY id DESC LIMIT 100
             `;
console.log(sql);
//            const result = await DB.prepare(`SELECT * FROM Memo ORDER BY id DESC`).all();
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
     *
     * @param
     *
     * @return
     */    
    get: async function(c, DB, id)
    {
        //console.log("#get");
        try{    
            const sql = `SELECT * FROM Memo WHERE id = ${id}`;            
            const result = await DB.prepare(sql).all();
            //console.log(result.results);
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
    create: async function(body, DB)
    {
        try{    
console.log(body);
            if (body) {
                const dt =  moment().format("YYYY-MM-DD 00:00:00");
console.log(moment().format("YYYY-MM-DD 00:00:00"));
                const sql = `
                INSERT INTO Memo ( title, content, updatedAt, userId)
                VALUES('${body.title}', '${body.content}',
                '${dt}', 0);
                `;
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
    update: async function(body, DB)
    {
        try{    
console.log(body);
            if (body) {
                /*
                const sql = `
                INSERT INTO Task ( title, content)
                VALUES('${body.title}', '${body.content}');
                `;
                */
                const sql = `
                UPDATE Memo 
                SET title = '${body.title}', content='${body.content}'
                WHERE id = ${body.id}
                `;
console.log(sql);
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
    delete: async function(body, DB)
    {
        try{    
console.log(body);
            if (body) {
                const sql = `
                DELETE FROM Memo  WHERE id= ${body.id};
                `;
console.log(sql);
                await DB.prepare(sql).run();
            }
            return {ret: "OK", data: body};
        } catch (e) {
            console.error(e);
            return {ret: "NG", data: body};
        } 
    },

}
export default Router;