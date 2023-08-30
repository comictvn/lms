<?php

namespace App\Services;

use App\Models\User;

class UserService extends BaseService
{
    public function __construct()
    {
    }

    public function filter(array $queries)
    {
        $queryBuilder = User::buildFilter([
            ['where', 'email', 'startWith', data_get($queries, 'users.email')],

        ]);

        $queryBuilder->orderBy('created_at', 'desc');

        return $queryBuilder->paginate(
            data_get($queries, 'pagination_limit', config('app.pagination.limit')),
            ['*'],
            'pagination_page',
            data_get($queries, 'pagination_page', 1),
        );
    }

    public function create(array $input): User
    {
        $user = User::create($input);

        return $user;
    }

    public function update(array $input, $id): User
    {
        $user = User::buildFilter([
            ['where', 'id', '=', $id],
        ])->firstOrFail();

        $user->update($input);

        return $user;
    }

    public function delete($id): bool
    {
        return User::buildFilter([

            ['where', 'id', '=', $id],

        ])->delete();
    }
}
