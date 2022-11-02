
const SCORES = ["red","yellow","blue","green"];
const ScoreColor = async (score) => {
   let id = Number(score)-1;
   return SCORES[id];
} 
const NewPercentage = async(post) => {
    const number_of_text = post.length * 4;
    const sum = await post.reduce((index,x)=>{return index + Number(x.score)},0);
    const percentage = (sum/number_of_text) * 100;
    return percentage;
}
const UpdateAnArray = async (newValue,array,id)=>{
    for (const obj of array){
        if(obj.id === Number(id)){
            obj = newValue;
            console.log({obj,array});
            break;
        }
    }
    console.log(array);
}


module.exports = {ScoreColor,NewPercentage,UpdateAnArray};