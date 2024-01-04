import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const theme = createTheme({
    typography: {
        fontFamily: 'Arial',
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
});

// variant: This prop specifies the size and weight of the text. It can be set to one of the following values: h1, h2, h3, h4, h5, h6, subtitle1, subtitle2, body1, body2, button, caption, or overline.
// color: This prop specifies the color of the text. It can be set to one of the following values: primary, secondary, textPrimary, textSecondary, error, or inherit.
// align: This prop specifies the alignment of the text. It can be set to one of the following values: left, center, right, justify, or inherit.
// gutterBottom: This prop adds a bottom margin to the text.

const TextRepo = () => {
    return (
        <div>
            <Typography variant="h1" gutterBottom style={{ color: 'red' }}>
                Heading 1
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" style={{ fontStyle: 'italic' }}>
                Subtitle 1
            </Typography>
            <Typography variant="body1" align="justify" style={{ textDecoration: 'underline' }}>
                Body 1
            </Typography>

            <ThemeProvider theme={theme}>
                <Typography variant="h1">Hello, world!</Typography>
            </ThemeProvider>

        </div>
    )
}

export default TextRepo
