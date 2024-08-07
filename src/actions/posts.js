'use server'

import {storePost} from "@/src/lib/posts";
import {redirect} from "next/navigation";
import {uploadImage} from "@/src/lib/cloudinary";

export async function createPost(prevSate, formData) {
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = []

    if (!title || !title.trim().length === 0) {
        errors.push('Title is required')
    }
    if (!content || !content.trim().length === 0) {
        errors.push('Content is required')

    }
    if (!image || image.size === 0) {
        errors.push('Image is required')
    }

    if (errors.length > 0) {
        return {errors}
    }

    // Before uploading data to database , upload image to cloudinary
    let imageUrl;
    try {
        imageUrl = await uploadImage(image)
    } catch (error) {
        throw new Error('Image Upload failed! Please try again later')
    }

   //  store data to database
   try{
       await storePost({
           imageUrl: imageUrl,
           title,
           content,
           userId: 1
       })
   }catch(error){
        throw new Error('Error occurred in uploading data in database')
   }

    // after form submission it'll automatically redirect to /feed
    redirect('/feed')
}