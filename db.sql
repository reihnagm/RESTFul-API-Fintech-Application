-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2020 at 04:57 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cash-it`
--

-- --------------------------------------------------------

--
-- Table structure for table `allocation_balances`
--

CREATE TABLE `allocation_balances` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `recipient` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `main_balances`
--

CREATE TABLE `main_balances` (
  `id` int(11) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `recipient` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `main_balances`
--

INSERT INTO `main_balances` (`id`, `amount`, `code`, `recipient`) VALUES
(30, '- Rp29.950', 'TRF140220889', '089670558381');

-- --------------------------------------------------------

--
-- Table structure for table `ref_transactions`
--

CREATE TABLE `ref_transactions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ref_transactions`
--

INSERT INTO `ref_transactions` (`id`, `name`) VALUES
(1, 'Top Up'),
(2, 'Transfer P2P (In)'),
(3, 'Transfer P2P (Out)'),
(4, 'Transfer Fee');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_histories`
--

CREATE TABLE `transaction_histories` (
  `id` int(11) NOT NULL,
  `transaction` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `amount` varchar(255) NOT NULL,
  `recipient` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction_histories`
--

INSERT INTO `transaction_histories` (`id`, `transaction`, `code`, `date`, `amount`, `recipient`) VALUES
(154, 'Top Up', 'TOP140220146', '2020-02-14 22:54:38', '+ Rp100,000', '089670558381'),
(155, 'Transfer P2P (Out)', 'TRO140220178', '2020-02-14 22:54:40', '- Rp50.000', '089670558381'),
(156, 'Transfer P2P (In)', 'TRI140220349', '2020-02-14 22:54:42', '+ Rp80.000', '089670558381'),
(157, 'Transfer Fee', 'TRF140220889', '2020-02-14 22:56:23', '- Rp29.950', 'Bank-In');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `FullName` varchar(255) NOT NULL,
  `PhoneNumber` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`FullName`, `PhoneNumber`, `Email`) VALUES
('Reihan Agam', '089670558381', 'reihanagam7@gmail.com\r\n');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allocation_balances`
--
ALTER TABLE `allocation_balances`
  ADD KEY `recipient` (`recipient`);

--
-- Indexes for table `main_balances`
--
ALTER TABLE `main_balances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipient` (`recipient`);

--
-- Indexes for table `ref_transactions`
--
ALTER TABLE `ref_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction_histories`
--
ALTER TABLE `transaction_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipient` (`recipient`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`PhoneNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `main_balances`
--
ALTER TABLE `main_balances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `ref_transactions`
--
ALTER TABLE `ref_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transaction_histories`
--
ALTER TABLE `transaction_histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `allocation_balances`
--
ALTER TABLE `allocation_balances`
  ADD CONSTRAINT `allocation_balances_ibfk_1` FOREIGN KEY (`recipient`) REFERENCES `users` (`PhoneNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `main_balances`
--
ALTER TABLE `main_balances`
  ADD CONSTRAINT `main_balances_ibfk_1` FOREIGN KEY (`recipient`) REFERENCES `users` (`PhoneNumber`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
