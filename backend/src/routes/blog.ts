import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@kartik_kk/medium"

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }, 
    Variables : {
        userId: string
    }
}>()

// middleware 1
blogRouter.use('/*', async (c, next) => {
    // get the header
    // verify the header
    // if the header is correct, proceed
    // extract the user id
    // pass it down to the route handler
    // if not, we return the user a 403 error code
    const token = c.req.header("Authorization") || "";
    
    
  
    try {
        const user = await verify(token,c.env.JWT_SECRET)
        if(user){
            c.set("userId",String(user.id))
        await next()
        } else {
        c.status(403)
        return c.json({
            error: "unauthorized"
        })
        }
    } catch(e){
        return c.json({
            error: "error while fetching"
        })
    } 
})

blogRouter.post('/',async (c)=>{
    
    const body = await c.req.json()
    const {success} = createBlogInput.safeParse(body); 
    if(!success){
        c.status(411);
        return c.json({
            msg: "Wrong inputs for Posting a Blog"
        })
    }

    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

    console.log("hi there")

    const post = await prisma.post.create({
        data : {
            title: body.title, 
            content : body.content, 
            authorId: authorId
        }
    })
    console.log("hi there3")
    return c.json({
        id: post.id
    })
})
  
blogRouter.put('/',async (c)=>{
    
    const body = await c.req.json()
    const {success} = updateBlogInput.safeParse(body)
    if(!success){
        c.status(411); 
        c.json({
            msg: "Wrong inputs to update the post"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

    const post = await prisma.post.update({
        where:{
            id: body.id
        },         
        data : {
            title: body.title, 
            content : body.content
        }
    })

    return c.json({
        id: post.id
    })

})
    


blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    
        // Todo: add pagination
    try  {
        const posts = await prisma.post.findMany({
            select : {
                content: true, 
                title: true, 
                id: true, 
                author : {
                    select : {
                        name: true
                    }
                }
            }
        })

        return c.json({
            posts
        })
    } catch(e){
        c.status(411)
        return c.json({
            messgae: "error while fetching all posts"
        })
}
})

blogRouter.get("/:id",async (c)=>{
    const id = c.req.param("id")    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

    try  {
        const post = await prisma.post.findUnique({
            where : {
                id: id
            }, 
            select : {
                id: true,
                title:true,
                content: true,
                author : {
                    select : {
                        name: true
                    }
                }
            }
        })
    
        return c.json({
            post
        })
    } catch(e){
        c.status(411)
        return c.json({
            messgae: "error while fetching post"
        })
    }
  
})