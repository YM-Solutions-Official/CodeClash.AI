"use client";
import { useBattleArenaStore } from "@/store/useBattleArenaStore";
import { RoomAccessor } from "@/utils/accessors";
import toast from "react-hot-toast";

interface TestResult {
  testCase: number;
  input: string;
  expectedOutput: string;
  actualOutput: string | null;
  passed: boolean;
  executionTime: number;
  error: string | null;
}

export function useCodeExecution(roomId: string) {
  const {
    code,
    language,
    setOutput,
    setIsRunning,
    setTestResults,
    setActiveTab,
    mySubmitted,
    setMySubmitted,
    setOpponentStatus,
  } = useBattleArenaStore();
  const roomAccessor = new RoomAccessor();
  const { runCode, submitCode } = roomAccessor;

  const handleRunCode = async () => {
    setActiveTab("output");
    setIsRunning(true);
    setOutput("Running test cases...\n\n");

    try {
      const response = await runCode(roomId, code, language);

      if (!response.results) {
        throw new Error("No results received");
      }

      setTestResults(response.results);

      let outputText = "Test Results:\n\n";

      response.results.forEach((result) => {
        outputText += `Test ${result.testCase}: `;

        if (result.error) {
          outputText += `Error\n`;
          outputText += `  Error: ${result.error}\n\n`;
        } else {
          outputText += result.passed ? "✓ Passed" : "✗ Failed";
          outputText += ` (${result.executionTime}ms)\n`;
          outputText += `  Input: ${result.input}\n`;
          outputText += `  Expected: ${result.expectedOutput}\n`;
          outputText += `  Got: ${result.actualOutput}\n\n`;
        }
      });

      const passed = response.results.filter((r) => r.passed).length;
      const total = response.results.length;

      outputText += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      outputText += `${passed}/${total} test cases passed`;

      if (passed === total) {
        outputText += "\n\nAll test cases passed! Ready to submit.";
        toast.success(`All ${total} test cases passed!`);
      } else {
        toast.error(`${total - passed} test case(s) failed`);
      }

      setOutput(outputText);
    } catch (error: any) {
      const errorMsg = `Error: ${error}\n\nPlease check your code and try again.`;
      setOutput(errorMsg);
      toast.error(error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {

    if (mySubmitted) return;

    setActiveTab("output");
    setIsRunning(true);
    setOutput("Validating solution...\n\n");

    try {
      // First run all test cases
      const runResponse = await runCode(roomId, code, language);

      if (!runResponse.results) {
        throw new Error("Failed to validate solution");
      }

      const passed = runResponse.results.filter((r) => r.passed).length;
      const total = runResponse.results.length;

      if (passed !== total) {
        setOutput(
          `Cannot submit: ${passed}/${total} test cases passed.\n\n` +
            `Please fix your code and try again.`
        );
        toast.error("Not all test cases passed");
        setIsRunning(false);
        return;
      }

      // Submit the code
      setOutput("All tests passed! Submitting...\n\n");
      const response = await submitCode(roomId, code);

      setMySubmitted(true);
      setOutput(
        `✅ Solution submitted successfully!\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `Submission time: ${new Date(
            response.submissionTime!
          ).toLocaleTimeString()}\n` +
          `Test cases passed: ${total}/${total}\n\n` +
          `Waiting for opponent to submit...`
      );

      toast.success("Code submitted successfully!");
    } catch (error: any) {
      setOutput(`❌ Submission failed: ${error}\n\nPlease try again.`);
      toast.error(error);
    } finally {
      setIsRunning(false);
    }
  };

  return {
    handleRunCode,
    handleSubmitCode,
  };
}
