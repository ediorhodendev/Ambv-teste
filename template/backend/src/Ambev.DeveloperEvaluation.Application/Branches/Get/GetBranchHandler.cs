// Exemplo de Handler que falta criar
using MediatR;
using Ambev.DeveloperEvaluation.Application.Branches.Get;
using Ambev.DeveloperEvaluation.Domain.Repositories;

public class GetBranchHandler : IRequestHandler<GetBranchCommand, GetBranchResult>
{
    private readonly IBranchRepository _repository;

    public GetBranchHandler(IBranchRepository repository)
    {
        _repository = repository;
    }

    public async Task<GetBranchResult> Handle(GetBranchCommand request, CancellationToken cancellationToken)
    {
        var branch = await _repository.GetByIdAsync(request.Id);
        if (branch == null)
            return null;

        return new GetBranchResult
        {
            Id = branch.Id,
            Name = branch.Name,
            Location = branch.Location
        };
    }
}
