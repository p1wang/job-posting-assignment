import { dbConnect } from "../config/db.js";
import {
  jobTypeMapper,
  jobCategoryMapper,
  industryMapper,
} from "../services/getId.js";

// actions
export const getPosting = async (req, res) => {
  const connection = await dbConnect();
  const { id } = req.params;

  try {
    const query = `SELECT 
    jobs.job_id,
    jobs.company_id,
    jobs.title,
    jobs.short_description,
    jobs.job_description,
    jobs.start_date,
    jobs.pay_rate,
    companies.company_name,
    companies.address,
    companies.email,
    companies.phone,
    industries.industry,
    job_categories.job_category,
    job_types.job_type
FROM
    jobs
        LEFT JOIN
    companies ON jobs.company_id = companies.company_id
        LEFT JOIN
    industries ON jobs.industry_id = industries.industry_id
        LEFT JOIN
    job_categories ON jobs.category_id = job_categories.category_id
        LEFT JOIN
    job_types ON jobs.type_id = job_types.type_id
WHERE
    job_id = ${id};`;

    const values = [];
    const [results] = await connection.execute(query, values);

    await connection.end();
    res.status(200).json({ results: results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong!" });
  }
};

export const getPostings = async (req, res) => {
  const connection = await dbConnect();
  const { page } = req.query;

  try {
    const query = `SELECT 
    jobs.job_id,
    jobs.company_id,
    jobs.title,
    jobs.short_description,
    jobs.job_description,
    jobs.start_date,
    jobs.pay_rate,
    companies.company_name,
    companies.address,
    companies.email,
    companies.phone,
    industries.industry,
    job_categories.job_category,
    job_types.job_type
FROM
    jobs
        LEFT JOIN
    companies ON jobs.company_id = companies.company_id
        LEFT JOIN
    industries ON jobs.industry_id = industries.industry_id
        LEFT JOIN
    job_categories ON jobs.category_id = job_categories.category_id
        LEFT JOIN
    job_types ON jobs.type_id = job_types.type_id
ORDER BY job_id DESC
LIMIT 10 
OFFSET ${(parseInt(page) - 1) * 10};
`;

    const values = [];
    const [results] = await connection.execute(query, values);

    const totalRowsQuery = `SELECT COUNT(*) AS totalRows FROM jobs;`;
    const [totalRows] = [];
    const [totalRowsResults] = await connection.execute(
      totalRowsQuery,
      totalRows
    );

    await connection.end();
    res.status(200).json({
      results: results,
      totalPages: Math.ceil(totalRowsResults[0].totalRows / 10),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong!" });
  }
};

export const deletePosting = async (req, res) => {
  const connection = await dbConnect();
  const { id } = req.params;

  try {
    const query = `DELETE FROM jobs WHERE job_id = ${id};`;

    const values = [];
    await connection.execute(query, values);

    await connection.end();
    res.status(200).json({ results: id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong!" });
  }
};

export const createPosting = async (req, res) => {
  const connection = await dbConnect();
  const {
    jobCategory,
    jobType,
    industry,
    title,
    shortDescription,
    jobDescription,
    startDate,
    payRate,
  } = req.body;

  const jobCategoryId = jobCategoryMapper(jobCategory);
  const jobTypeId = jobTypeMapper(jobType);
  const industryId = industryMapper(industry);

  try {
    const query = `INSERT INTO jobs
        (company_id,
         category_id,
         type_id,
         industry_id,
         title,
         short_description,
         job_description,
         start_date,
         pay_rate)
    VALUES
        (108,
         ${jobCategoryId},
         ${jobTypeId},
         ${industryId},
         "${title}",
         "${shortDescription}",
         "${jobDescription}",
         "${startDate}",
         ${payRate});`;

    const values = [];

    await connection.execute(query, values);

    await connection.end();
    res.status(200).json({ results: "results" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong!" });
  }
};

export const updatePosting = async (req, res) => {
  const connection = await dbConnect();
  const { id } = req.params;
  const {
    jobCategory,
    jobType,
    industry,
    title,
    shortDescription,
    jobDescription,
    startDate,
    payRate,
    descriptionFile,
  } = req.body;

  console.log(req.body);

  const jobCategoryId = jobCategoryMapper(jobCategory);
  const jobTypeId = jobTypeMapper(jobType);
  const industryId = industryMapper(industry);

  try {
    const query = `UPDATE jobs
    SET
        category_id = ${jobCategoryId},
        type_id = ${jobTypeId},
        industry_id = ${industryId},
        title = "${title}",
        short_description = "${shortDescription}",
        job_description = "${jobDescription}",
        start_date = "${startDate}",
        pay_rate = ${payRate}
    WHERE
        job_id = ${id};`;

    const values = [];

    await connection.execute(query, values);

    const resultsQuery = `SELECT
        jobs.job_id,
        jobs.company_id,
        jobs.title,
        jobs.short_description,
        jobs.job_description,
        jobs.start_date,
        jobs.pay_rate,
        companies.company_name,
        companies.address,
        companies.email,
        companies.phone,
        industries.industry,
        job_categories.job_category,
        job_types.job_type
    FROM
        jobs
            LEFT JOIN
        companies ON jobs.company_id = companies.company_id
            LEFT JOIN
        industries ON jobs.industry_id = industries.industry_id
            LEFT JOIN
        job_categories ON jobs.category_id = job_categories.category_id
            LEFT JOIN
        job_types ON jobs.type_id = job_types.type_id
    WHERE
        job_id = ${id};`;

    const [results] = await connection.execute(resultsQuery, values);

    await connection.end();
    res.status(200).json({ results: results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong!" });
  }
};
