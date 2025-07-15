import { PortfolioController } from "../portfolio.controller";
import { PortfolioService } from "../portfolio.service";

describe("PortfolioController", () => {
  let controller: PortfolioController;
  let service: Partial<PortfolioService>;

  beforeEach(() => {
    service = {
      list: jest.fn(),
      add: jest.fn(),
      remove: jest.fn(),
    };
    controller = new PortfolioController(service as PortfolioService);
  });

  it("should list portfolio for user", async () => {
    (service.list as jest.Mock).mockResolvedValue([
      { symbol: "AAPL", userId: "user1", addedAt: expect.any(Date) },
    ]);
    const req = { user: { userId: "user1" } };
    const result = await controller.list(req as any);
    expect(result).toEqual([
      { symbol: "AAPL", userId: "user1", addedAt: expect.any(Date) },
    ]);
  });

  it("should add stock for user", async () => {
    (service.add as jest.Mock).mockResolvedValue({
      symbol: "AAPL",
      userId: "user1",
      addedAt: expect.any(Date),
    });
    const req = { user: { userId: "user1" } };
    const result = await controller.add(req as any, { symbol: "AAPL" });
    expect(result).toEqual({
      symbol: "AAPL",
      userId: "user1",
      addedAt: expect.any(Date),
    });
  });

  it("should remove stock for user", async () => {
    (service.remove as jest.Mock).mockResolvedValue({ deleted: true });
    const req = { user: { userId: "user1" } };
    const result = await controller.remove(req as any, "AAPL");
    expect(result).toEqual({ deleted: true });
  });
});
