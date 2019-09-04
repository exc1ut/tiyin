import {combineReducers} from 'redux';
import Categories from './category';
import Lang from './lang';
import Cat from './cat'

export default combineReducers({
    category: Categories,
    cat: Cat,
    lang: Lang
})