import React,{useEffect} from 'react';
import { useAppDispatch,useAppSelector } from '../../../hooks/hooks';
import {getCompletedTasks } from '../slice/taskSlice';
import type { RootState } from '../../../store/store';
export default function CompletedTaskList() {
     const dispatch=useAppDispatch();
      
  const {completedTaskLoading,completedTasks,error}=useAppSelector((state: RootState) => state.task);
      useEffect(()=>{
   
    dispatch(getCompletedTasks());  
  
  },[dispatch])
  
  
  if(completedTaskLoading){
    return  <div> Loading</div>
  }
  if(error){
    return  <div>Error</div>
  }
    
  return (
    <div>
<h1>
   Completed  Tasks 
</h1>

 <div className="p-4  border border-gray-400">
        {completedTasks && completedTasks.length > 0 && completedTasks.map((task)=>(
            <div key={task.id} className='flex gap-2 my-5'>
                  <h1>
                    {task.title}
                    
                      {/* {task.taskDate} */}

                     
                  </h1>
                  <h1>
                     {task.rewardAmount}
                  </h1>
               
            </div>
        ))}
    </div>

    </div>
  );
}
