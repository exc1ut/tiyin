const INITIAL_STATE = {
    lang:"uz"
}

export default (state=INITIAL_STATE,action) => {
   
    switch(action.type){
        case "Lang": return {lang:action.payload};
        default: return state;
    }
}