export const functions = { 

    getSelectedText(){
        const selection = window.getSelection().toString();
        console.log(selection);
        return selection;
    },
    
    filterText(text){
        const htmlTags = /<\/?[a-z][^>]*>/ig; //regExp for finding html tags
        const content = text.replaceAll('&nbsp;', ' ');
        const htmlTagIndex = content.indexOf('<');

        const textBeforeTags = content.substring(0, htmlTagIndex); //text before first html tag
        const textWithTags = content.substring(htmlTagIndex); //text from first html tag
        const textWithoutTags = textWithTags.replace(htmlTags, '\n\n');

        // console.log(textBeforeTags);
        // console.log(textWithTags);
        // console.log(textWithoutTags);

        const previewText = textBeforeTags + '\n\n' + textWithoutTags;

        return previewText;
    },
    
    getDate(){
        const dateObject = new Date();
        const dateOnly = dateObject.toString().substring(4, 15);
        let hours = dateObject.getHours();
        let minutes = dateObject.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
            hours = hours % 12 === 0 ? '12': hours % 12;
            minutes = minutes < 10 ? '0' + minutes : minutes; //precede single-digit minutes with zero

        const date = {
            date: dateOnly,
            time: {
                hours,
                minutes,
                ampm
            }
        };
        return date;
    },

    getTextPortion(text, cutOffIndex){
        const textPortion = text.length <= cutOffIndex ?
            text.substring(0) : text.substring(0, 50) + '...';
            return textPortion;
    },

    clearTextBox(event){
        event.target.value = '';
    }
};
