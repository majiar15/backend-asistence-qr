


export function cutName(username: string): any {

    username = username.toLocaleLowerCase();
    
    let name ='';
    let surnames='';

    const name_split = username.trim().split(' ');

    const length = name_split.length;

    if (length >= 4) {
        
        name = name_split.slice(length - 2, length).join(' ');
        surnames = name_split.slice(0,length - 2).join(' ');

    } if(length==3){

        name = (name_split[2]);
        surnames = (name_split[0] + ' ' + name_split[1]);
    }else if(length==2){

        name = (name_split[1]);
        surnames = (name_split[0]);
    }else if(length==1){
        
        name = (name_split[0]);
    }

    return {name,surnames};


}