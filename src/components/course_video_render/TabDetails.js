import TabAbout from "./TabAbout";
import TabDiscustions from "./TabDiscustions";
import TabNotes from "./TabNotes";
import { TabResource } from "./TabResource";


const TabDetails=({type})=>{
    return(
        <>
        {type==='about'&&<TabAbout/>}
        {type==='discustion'&&<TabDiscustions/>}
        {type==='notes'&&<TabNotes/>}
        {type==='resource'&&<TabResource/>}
        
        </>
    )
}

export default TabDetails;