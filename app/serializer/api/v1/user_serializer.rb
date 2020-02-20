module Api
  module V1
    class UserSerializer
      include FastJsonapi::ObjectSerializer
      
      attributes :id, :name, :email, :role

    end
  end
end
