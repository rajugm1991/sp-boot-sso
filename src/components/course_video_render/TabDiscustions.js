
import React from 'react'
import CommentList from './CommentList'

const TabDiscustions = () => {
  return (
   <>
  <div className='m-2'> 
<form> 
   <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
       <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
           <label for="comment" class="sr-only">Your comment</label>
           <textarea id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
       </div>
       <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
           <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Post comment
           </button> 
       </div>
   </div>
</form>

  <div id='commentList' className='space-y-5' >
   <CommentList image='https://lh3.googleusercontent.com/a/AEdFTp7GuZa5q4lxJ6pThHINi22cdQFUHnxVfgfu6PQrBg=s96-c' comment='A quick question, So when the user of a country lets say India makes a request, To what exactly will he be making a request, Because how do we know which CDN box we have to hit, We have the users location but who determines the routing, Will there be an intermediate gateway or something like that in each country? A quick question, So when the user of a country lets say India makes a request, To what exactly will he be making a request, Because how do we know which CDN box we have to hit, We have the users location but who determines the routing, Will there be an intermediate gateway or something like that in each country?A quick question, So when the user of a country lets say India makes a request, To what exactly will he be making a request, Because how do we know which CDN box we have to hit, We have the users location but who determines the routing, Will there be an intermediate gateway or something like that in each countr'/>
   <CommentList image='https://lh3.googleusercontent.com/a/AGNmyxY02nIzig39ao8cbDDmyFdbZWvnFWKEM2FvuXErFg=s96-c' comment='Gateway is a reverse proxy, right? Gateway can contain Load balancer as well ?'/>
  </div>
  
</div>

   </>
  )
}

export default TabDiscustions