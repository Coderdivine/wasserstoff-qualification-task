
const SCORES = ["red","yellow","blue","green"];
const ScoreColor = (score) => {
   let id = Number(score)-1;
   return SCORES[id];
} 
const NewPercentage = (post_id) => {
    return
}
const UpdateAnArray =(newValue,array,id)=>{
    for (const obj of array){
        if(obj.id === Number(id)){
            obj = newValue;
            console.log({obj,array});
            break;
        }
    }
    console.log(array);
}


module.exports = {ScoreColor,NewPercentage};