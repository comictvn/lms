module Api
  module V1
    class AssignmentsController < BaseController
      def index
        authorize! :manage, Assignment
        page_number = (params[:page] || 1).to_i
        assignments = Assignment.order(create_at: :desc).includes(questions: [:answers]).page(page_number)
        options = {}
        options[:meta] = { pager: { total: assignments.total_count, current: page_number } }
        json_assignments = AssignmentSerializer.new(assignments, options).serializable_hash
        json_response(json_assignments)
      end

      def create
        authorize! :manage, Assignment
        assignment_form = AssignmentForms::Creating.new(assignment_params)
        assignment_form.current_user = current_user
        assignment_form.create
        response = { message: 'A assignment was created!' }
        json_response(response, :created)
      end

      def destroy
        authorize! :manage, Assignment
        assignment.destroy!
        json_response({message: 'A assignment account was deleted!'})
      end

      def show
        authorize! :manage, Assignment
        options = {}
        json_assignment = AssignmentSerializer.new(assignment, options).serializable_hash
        json_response(json_assignment)
      end

      def update
        authorize! :manage, Assignment
        assignment_form = AssignmentForms::Updating.new(assignment_params)
        assignment_form.current_user = current_user
        assignment = assignment_form.update
        json_assignment = AssignmentSerializer.new(assignment).serializable_hash
        json_response(json_assignment)
      end

      private
      def assignment_params
        params.permit(:id, :name, :description, questions: [:id, :name, :description, answers: [:id, :description, :is_correct]])
      end

      def assignment
        @assignment ||= Assignment.find(params[:id])
      end
    end
  end
end
