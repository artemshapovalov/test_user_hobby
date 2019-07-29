import * as React from 'react';
import { GlobalState } from '../../ducks';
import cx from 'classnames';
import { connect } from 'react-redux';
import { addUser, fetchAll } from '../../ducks/user/actions';
import { isEmpty } from 'lodash';
import { addHobby, fetchHobbiesByUserId, removeHobby } from '../../ducks/hobby/actions';
import Button from '../../ui-kit/components/button/Button';
import ResizableTiles from '../../components/resizable-tiles/ResizableTiles';
import { UserState, User, AddUserAction, FetchAllUserAction } from '../../ducks/user/types';
import {
  HobbyState,
  Hobby,
  FetchHobbiesByUserIdAction,
  AddHobbyAction, RemoveHobbyAction
} from '../../ducks/hobby/types';

import './Home.scss';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { getClassName } from '../../utils/component';

interface State {
  userId: string;
  userName: string;
  hobbyName: string;
  passion: string;
  year: string;
}

export interface HomeProps {
  user: UserState;
  hobby: HobbyState;
}

export interface HomeActionProps {
  fetchAll: FetchAllUserAction;
  addUser: AddUserAction;
  fetchHobbiesByUserId: FetchHobbiesByUserIdAction;
  addHobby: AddHobbyAction;
  removeHobby: RemoveHobbyAction;
}

export interface IPassionOptions {
  id: number;
  value: string;
  description: string;
  disabled: boolean;
}

const PASSION_OPTIONS: IPassionOptions[] = [
  {
    id: 0,
    value: '',
    description: 'Select passion level',
    disabled: true
  },
  {
    id: 1,
    value: 'low',
    description: 'Low',
    disabled: false
  },
  {
    id: 2,
    value: 'medium',
    description: 'Medium',
    disabled: false
  },
  {
    id: 3,
    value: 'high',
    description: 'High',
    disabled: false
  },
  {
    id: 4,
    value: 'very-high',
    description: 'Very-High',
    disabled: false
  }
];

const ccn = getClassName('home');

export class Home extends React.Component<HomeProps & HomeActionProps> {
  state: State = {
    userId: '',
    userName: '',
    hobbyName: '',
    passion: '',
    year: ''
  };

  componentDidMount(): void {
    this.props.fetchAll();
  }

  handleAddUser = (): void => {
    const { userName } = this.state;
    if (isEmpty(userName)) return;

    this.props.addUser(userName);
    this.setState({ userName: '' });
  };

  handleAddHobby = (): void => {
    const { userId, hobbyName, passion, year } = this.state;
    if (isEmpty(userId) || isEmpty(hobbyName) || isEmpty(passion) || isEmpty(year)) return;
    const hobby = {
      userId,
      name: hobbyName,
      passion,
      year
    };

    this.props.addHobby(hobby);
    this.setState({ hobbyName: '', passion: '', year: '' });
  };

  getPassionOptions() {
    return PASSION_OPTIONS.map(({ id, value, description, disabled }: IPassionOptions) => (
      <option value={value} key={id} disabled={disabled}>
        {description}
      </option>
    ));
  }

  onInputChange = (event: any, inputType: string) => {
    if (!event) return;

    event.persist();
    const { value } = event.target;
    switch (inputType) {
      case 'hobby':
        this.setState({ hobbyName: value });
        break;
      case 'name':
        this.setState({ userName: value });
        break;
      case 'passion':
        this.setState({ passion: value });
        break;
      case 'year':
        if (!value.match(/^[0-9]*$/)) return;
        this.setState({ year: value });
        break;
      default:
        break;
    }
  };

  onUserSelect = (e: React.MouseEvent, userId: string) => {
    if (!e) return;
    this.setState({ userId });
    this.props.fetchHobbiesByUserId(userId);
  };

  handleRemoveHobby = (id: string): any => {
    this.props.removeHobby(id);
  };

  renderPassionSelect = () => {
    return (
      <select
        className={ccn("input")}
        id="hobby-passion"
        name="hobby-passion"
        onChange={e => this.onInputChange(e, 'passion')}
        value={this.state.passion}
      >
        {this.getPassionOptions()}
      </select>
    );
  };

  render() {
    const { user, hobby } = this.props;

    return (
      <div className={ccn()}>
        <div className={ccn('header')}>User Hobbies</div>
        <div className={ccn("body")}>
          <ResizableTiles>
            <div className={ccn("column")}>
              <div className={ccn("controls")}>
                <input
                  className={ccn("input")}
                  onChange={e => this.onInputChange(e, 'name')}
                  placeholder="Enter user name"
                  type="text"
                  value={this.state.userName}
                />
                <Button action={this.handleAddUser}>Add</Button>
              </div>
              <div className={ccn("list")}>
                {user.loaded &&
                  user.users.map(({ id, name }: User) => (
                    <div key={id} className={ccn("row")} onClick={e => this.onUserSelect(e, id)}>
                      <div
                        className={cx(ccn('cell'), ccn('cell--selectable'), {
                          [ccn('cell--selected')]: id === this.state.userId
                        })}
                      >
                        {name}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className={ccn("column")}>
              <div className={ccn("controls")}>
                {this.renderPassionSelect()}
                <input
                  className={ccn("input")}
                  onChange={e => this.onInputChange(e, 'hobby')}
                  placeholder="Enter user hobby"
                  type="text"
                  value={this.state.hobbyName}
                />
                <input
                  className={ccn("input")}
                  onChange={e => this.onInputChange(e, 'year')}
                  placeholder="Enter year"
                  type="text"
                  value={this.state.year}
                />
                <Button action={this.handleAddHobby}>Add</Button>
              </div>
              <div className={ccn("list")}>
                {hobby.loaded &&
                  hobby.hobbies.map(({ id, name, passion, year }: Hobby) => (
                    <div key={id} className={ccn("row")}>
                      <div className={cx(ccn('passion'), ccn('cell'))}>
                        Passion: {passion}
                      </div>
                      <div className={cx(ccn('hobby'), ccn('cell'))}>{name}</div>
                      <div className={cx(ccn('year'), ccn('cell'))}>Since {year}</div>
                      <div className={ccn("delete")}>
                        <Button action={() => this.handleRemoveHobby(id)} close />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </ResizableTiles>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, hobby }: GlobalState): HomeProps => ({
  user,
  hobby
});

function mapDispatchToProps(dispatch: Dispatch<Action>): HomeActionProps {
  return bindActionCreators({
    fetchAll,
    addUser,
    addHobby,
    fetchHobbiesByUserId,
    removeHobby
  }, dispatch)
}

export default connect<HomeProps, HomeActionProps>(
  mapStateToProps,
  mapDispatchToProps
)(Home);
