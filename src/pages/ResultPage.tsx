import * as React from 'react';
import SearchForm from '../components/SearchForm';
import { AppBar, Tabs, Tab, Toolbar, Typography, withStyles, WithStyles } from 'material-ui';
import { connect } from 'react-redux';
import GraphTab from '../components/GraphTab';
import DocumentTab from '../components/DocumentTab';
import { Theme } from 'material-ui/styles';
import { RootState } from '../redux/reducer';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { TypographyProps } from 'material-ui/Typography';

const styles = (theme: Theme) => ({
    brand: {
        textDecoration: 'none'
    }
});

interface ResultPageProps {
    dispatch: Dispatch<RootState>;
}

type TabType = 'document' | 'api-graph';

class ResultPage extends React.Component<ResultPageProps & WithStyles<'brand'>, {tab: TabType}> {
    state: {tab: TabType} = {
        tab: 'document'
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <AppBar color="primary" position="static">
                    <Toolbar>
                        <Typography
                            className={classes.brand}
                            type="title"
                            color="inherit"
                            component={Link as React.ComponentType<TypographyProps>}
                            {...{to: '/'}}
                        >
                            SEI SNOW Project
                        </Typography>
                        <SearchForm/>
                    </Toolbar>
                </AppBar>

                <Tabs value={this.state.tab} onChange={(e, v) => this.setState({tab: v})}>
                    <Tab value="document" label="Document"/>
                    <Tab value="api-graph" label="API Graph"/>
                </Tabs>

                {this.state.tab === 'document' && <DocumentTab/>}
                {this.state.tab === 'api-graph' && <GraphTab/>}
            </div>
        );
    }
}

export default withStyles(styles)<{}>(connect()(ResultPage));
