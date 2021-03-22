import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

return (
<Card className={classes.card}>
    <CardContent>
            <form id="login" className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField id="username" label="User Name" />
                <TextField id="password" label="Password" />
            </form>
    </CardContent>
    <CardActions>
        <Button size="small">Submit</Button>
      </CardActions>
</Card>
)