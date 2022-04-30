import { CardContent, Typography } from "@mui/material"

const PostContent = ({ content }: { content: string | null }) => {
    return (
        <CardContent>
            <Typography variant="body2">
                {content}
            </Typography>
        </CardContent>
    )
}

export default PostContent
