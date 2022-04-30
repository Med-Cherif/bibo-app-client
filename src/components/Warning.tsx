import { Backdrop, Button, styled, Paper, Typography, Box } from '@mui/material'

const PaperStyled = styled(Paper)(({
    width: '100%',
    maxWidth: '600px',
}));

const Warning = ({ warningVisible, hideWarning }: { hideWarning: () => void, warningVisible: boolean }) => {   
    
    return (
        <Backdrop
            sx={{ 
                zIndex: (theme) => theme.zIndex.drawer + 1,
                padding: 2, 
                display: 'grid', 
                gridTemplateColumns: '1fr',
                justifyItems: 'center',
                overflow: 'auto',
                
            }}
            open={warningVisible}
        >
            <PaperStyled sx={{ padding: '16px' }} elevation={0}>
                <Typography gutterBottom variant="h3" align="center">Warning - تحذير</Typography>
                <Typography gutterBottom variant="h5" align="center">Not recommended to put your real informations here</Typography>
                <Typography gutterBottom variant="h5" dir="rtl" align="center">ننصحك بعدم وضع معلوماتك هنا</Typography>
                <Typography gutterBottom variant="h5" align="center">Only for developers - المطورين فقط</Typography>
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                    <Button onClick={hideWarning} variant="contained">Continue</Button>
                </Box>
            </PaperStyled>
        </Backdrop>
    )
}

export default Warning
