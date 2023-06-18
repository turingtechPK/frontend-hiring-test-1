import styled from "styled-components";

export const ListTechnologiesStyled = styled.div`
box-sizing: border-box;
width: 100%;
padding: 10px;
height: 100%;
display: flex;
flex-direction: column;
gap: 20px;
.loader{
    display: flex;
    margin: auto;
    justify-content: center;
}
    .container{
        padding: 2em;
        .table-wrapper{
            .head{
                background-color: #f4f4f9;
            }
            .body{
                .direction{
                    color:#315fe9;
                }
                .answered {
                    color: #83dcd1;
                }
                .voicemail{
                    color: #315fe9;
                }
                .missed{
                    color: #d25165;
                }
            }
        }
        .button{
            background-color: blue;
            color: #FFFFFF;
        }
    }
    .pagination{
        width: 100%;
        display: flex;
        justify-content: center;
        padding-bottom: 20px;
    }
`;