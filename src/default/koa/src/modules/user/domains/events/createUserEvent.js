import IDomainEvent from '../../../../share/core/IDomainEvent';

class CreateUserEvent extends IDomainEvent {
  constructor(user) {
    super();
    this.name = 'CREATE_USER';
    this.user = user;
  }
}

export default CreateUserEvent;
