import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { CREATE_USER } from '../../graphql/mutations';
import { CreateUserModel } from '../../models/user.model';
import { GET_USER_ID_BY_EMAIL } from '../../graphql/queries';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apollo: Apollo) {}

  getUserIdByEmail(email: string): Observable<string> {
    return this.apollo
      .watchQuery<any>({
        query: GET_USER_ID_BY_EMAIL,
        variables: {
          email,
        },
      })
      .valueChanges.pipe(map((result) => result.data.getUserByEmail.id));
  }

  createUser(name: string, email: string): Observable<CreateUserModel> {
    return this.apollo
      .mutate<CreateUserModel>({
        mutation: CREATE_USER,
        variables: {
          name,
          email,
        },
      })
      .pipe(map((result: any) => result.data.createUser));
  }
}
