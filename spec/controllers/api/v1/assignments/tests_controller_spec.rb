require 'rails_helper'

RSpec.describe Api::V1::Assignments::TestsController do
  let(:user) { create(:user) }
  let(:assignment) { create(:assignment, user: user) }

  describe "GET #index api/v1/assignments/tests" do
    context 'when authenticated' do
      before do
        request.cookies['jwt'] = token_generator(user.id)
        assignment
        get :index
      end

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "JSON body response contains expected recipe attributes" do
        expect(response).to match_response_schema("tests")
      end
    end

    context 'when not authenticated' do
      before do
        assignment
        get :index
      end

      it "returns http error" do
        expect(response).to have_http_status(422)
      end
    end
  end

  describe "GET #show api/v1/assignments/tests/:id" do
    context 'when authenticated' do
      before do
        request.cookies['jwt'] = token_generator(user.id)
        get :show, params: { id: assignment.id }
      end

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "JSON body response contains expected recipe attributes" do
        expect(response).to match_response_schema("test")
      end
    end

    context 'when not authenticated' do
      before do
        get :show, params: { id: assignment.id }
      end

      it "returns http error" do
        expect(response).to have_http_status(422)
      end
    end
  end

  describe "POST #create api/v1/assignments/tests" do
    context 'when authenticated' do
      before do
        request.cookies['jwt'] = token_generator(user.id)
        post :create, params: { assignment_id: assignment.id }
      end

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "JSON body response contains expected recipe attributes" do
        expect(response).to match_response_schema("result")
      end
    end

    context 'when not authenticated' do
      before do
        post :create, params: { assignment_id: assignment.id }
      end

      it "returns http error" do
        expect(response).to have_http_status(422)
      end
    end
  end
end
