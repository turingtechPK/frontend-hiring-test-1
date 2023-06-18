import styled from "styled-components";


export const AddNotesDialogStyled = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
gap: 5px;

.loader{
    width: 100%;
    height: 100%;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;
}

.header{
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: 100px;
    .technology-id{
        color: blue;
        font-size: 14px;
    }
}
.content{
    font-size: 14px;
    .text-area{
        height: 100px;
    }
}
.button{
    color: #FFFFFF;
    background-color: blue;
}

`;