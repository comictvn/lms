<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\User\CreateUserResource;
use App\Http\Resources\User\FilterUserCollection;
use App\Http\Resources\User\UpdateUserResource;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function filter(Request $request): FilterUserCollection
    {
        $result = $this->userService->filter($request->query());

        return new FilterUserCollection($result);
    }

    public function create(CreateUserRequest $request): CreateUserResource
    {
        $result = $this->userService->create($request->all());

        return new CreateUserResource($result);
    }

    public function update(UpdateUserRequest $request, string $id): UpdateUserResource
    {
        $result = $this->userService->update($request->all(), $id);

        return new UpdateUserResource($result);
    }

    public function delete(string $id): JsonResponse
    {
        $this->userService->delete($id);

        return response()->json(null);
    }
}
