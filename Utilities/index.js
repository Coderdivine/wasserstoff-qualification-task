
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
        if(obj.item_id == Number(id)){
            //{score,color,text,item_id}
            console.log({obj})
            obj.score = newValue.score;
            obj.color = newValue.color;
            obj.text = newValue.text;
            obj.item_id = newValue.item_id;
            console.log({obj});
            console.log({array_one:array});
            break;
        }
    }
    console.log({array});
    return array;
}


module.exports = {ScoreColor,NewPercentage,UpdateAnArray};