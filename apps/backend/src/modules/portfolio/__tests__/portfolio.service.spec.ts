import { PortfolioService } from "../portfolio.service";
import { PortfolioRepository } from "../portfolio.repository";
import { ConflictException, BadRequestException } from "@nestjs/common";

describe("PortfolioService", () => {
  let service: PortfolioService;
  let repo: jest.Mocked<PortfolioRepository>;

  beforeEach(() => {
    repo = {
      findByUser: jest.fn(),
      add: jest.fn(),
      remove: jest.fn(),
      exists: jest.fn(),
    } as any;
    service = new PortfolioService(repo);
  });

  it("should add a stock if not duplicate", async () => {
    repo.exists.mockResolvedValue(false);
    repo.add.mockResolvedValue({
      symbol: "AAPL",
      userId: "user1",
      addedAt: new Date(),
    });
    const result = await service.add("user1", { symbol: "AAPL" });
    expect(result).toEqual({
      symbol: "AAPL",
      userId: "user1",
      addedAt: expect.any(Date),
    });
  });

  it("should throw on duplicate add", async () => {
    repo.exists.mockResolvedValue(true);
    await expect(service.add("user1", { symbol: "AAPL" })).rejects.toThrow(
      ConflictException
    );
  });

  it("should remove a stock if exists", async () => {
    repo.remove.mockResolvedValue({ deleted: true });
    const result = await service.remove("user1", { symbol: "AAPL" });
    expect(result).toEqual({ deleted: true });
  });

  it("should throw if removing non-existent stock", async () => {
    repo.remove.mockResolvedValue({ deleted: false });
    await expect(service.remove("user1", { symbol: "AAPL" })).rejects.toThrow(
      BadRequestException
    );
  });

  it("should list user portfolio", async () => {
    repo.findByUser.mockResolvedValue([
      { symbol: "AAPL", userId: "user1", addedAt: new Date() },
    ]);
    const result = await service.list("user1");
    expect(result).toEqual([
      {
        symbol: "AAPL",
        userId: "user1",
        addedAt: expect.any(Date),
      },
    ]);
  });
});
