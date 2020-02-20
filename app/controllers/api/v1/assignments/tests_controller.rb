module Api
  module V1
    class Assignments::TestsController < BaseController
      def index
        authorize! :read, Assignment
        page_number = (params[:page] || 1).to_i
        assignments = Assignment.order(create_at: :desc).includes(questions: [:answers]).page(page_number)
        options = {}
        options[:meta] = { pager: { total: assignments.total_count, current: page_number } }
        json_assignments = Assignments::TestSerializer.new(assignments, options).serializable_hash
        json_response(json_assignments)
      end

      def show
        authorize! :read, Assignment
        options = {}
        json_assignment = Assignments::TestSerializer.new(assignment, options).serializable_hash
        json_response(json_assignment)
      end

      def create
        authorize! :submission, Assignment
        assignment = Assignment.find(params[:assignment_id])
        json_assignment = Assignments::ResultSerializer.new(assignment).serializable_hash
        json_response(json_assignment)
      end

      private
      def assignment
        @assignment ||= Assignment.find(params[:id])
      end
    end
  end
end
