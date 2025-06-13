const Invoice = require("../models/Invoice");
const InvoiceDetail = require("../models/InvoiceDetail");
const Trip = require("../models/Trip");

const statisticsController = {
  // Thống kê doanh thu theo tháng
  getRevenue: async (req, res) => {
    try {
      const revenueData = await Invoice.aggregate([
        {
          $group: {
            _id: { $month: "$issueDate" },
            revenue: { $sum: "$totalAmount" },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      res.json(revenueData);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi thống kê doanh thu", error });
    }
  },

  // Thống kê số lượng vé bán theo tuyến
  getTickets: async (req, res) => {
    try {
      const ticketData = await Trip.aggregate([
        {
          $project: {
            route: { $concat: ["$from", " - ", "$to"] },
            seats: { $concatArrays: ["$seats.tangDuoi", "$seats.tangTren"] },
          },
        },
        {
          $unwind: "$seats",
        },
        {
          $match: { "seats.status": "sold" },
        },
        {
          $group: {
            _id: "$route",
            ticketsSold: { $sum: 1 },
          },
        },
        {
          $sort: { ticketsSold: -1 },
        },
      ]);

      if (ticketData.length > 0) {
        res.json(ticketData);
      } else {
        res.status(404).json({ message: "Không có dữ liệu vé bán." });
      }
    } catch (error) {
      console.error("Lỗi khi thống kê vé bán:", error);
      res.status(500).json({ message: "Lỗi khi thống kê vé bán", error });
    }
  },

  // Thống kê số lượng vé bán theo tháng
  getTicketsbyMonth: async (req, res) => {
    try {
      const ticketData = await InvoiceDetail.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            ticketsSold: { $sum: "$quantity" },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      res.json(ticketData);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi thống kê vé bán theo tháng", error });
    }
  },
};

module.exports = statisticsController;
